#include "pch.h"
#include "CAFF.h"
#include "ParserException.h"
#include "EasyBMP.hpp"

CAFF::CAFF(std::vector<unsigned char> data_, bool fuzzing) : data(data_), fuzzing_(fuzzing) {
    if (fuzzing_) {
        data = std::vector<unsigned char>(std::istreambuf_iterator<char>(std::cin), {});
    }
    else {
        if (data.size() == 0) throw ParserException("CAFF file does not exist.");
    }

    index = 0;
    num_anim = 0;
    date = "";

}

CAFF::~CAFF() {
    data.clear();
}

void CAFF::parse() {
    readCAFFHeader();
    readCAFFCredits();
    readCAFFAnimation();
    createThumbnail();
}

void CAFF::setNumAnim(int num_anim_) {
    num_anim = num_anim_;
}

void CAFF::incrementIndex(int x = 1) {
    index += x;
}
int CAFF::getIndex() {
    return index;
}

void CAFF::setCreator(const std::string& creator_) {
    creator = creator_;
}

void CAFF::setDate() {

    std::string  Y = std::to_string(readBlockInt(2));
    std::string  M = std::to_string(readBlockInt(1));
    std::string  D = std::to_string(readBlockInt(1));
    std::string  h = std::to_string(readBlockInt(1));
    std::string  m = std::to_string(readBlockInt(1));

    date = (Y + "-" + M + "-" + D + " " + h + ":" + m);

}
std::string CAFF::getDate() {
    return date;
}

int CAFF::readBlockInt(int block_Length) {

    int ret = 0;
    if (getIndex() + block_Length > data.size()) {
        throw ParserException("index out of range");
    }
    for (int i = 0; i < block_Length; i++) {
        ret |= ((int)data[getIndex() + i]) << (i * 8);
    }
    incrementIndex(block_Length);
    return ret;

}
std::string CAFF::readBlockAscii(int block_Length) {
    std::string ret;
    if (getIndex() + block_Length > data.size()) {
        throw ParserException("index out of range");
    }
    for (int i = 0; i < block_Length; i++) {
        ret += data[getIndex() + i];
    }

    incrementIndex(block_Length);
    return ret;
}
void CAFF::readCAFFHeader() {

    //Check if ID is correct
    if (int(data[getIndex()]) != 1) {
        throw ParserException("Header should start with ID:1");
    }
    incrementIndex();
    //get the value of the length field 
    int len = readBlockInt(8);
    //Process Data Block
    //Check for Magic string

    std::string magic = readBlockAscii(4);
    if (magic != "CAFF") {
        throw ParserException("magic block should be CAFF");
    }

    //get header size
    int header_size = readBlockInt(8);
    if (header_size != 20) {
        throw ParserException("header length mismatch");
    }
    //get the number of animations
    int num_anim = readBlockInt(8);
    setNumAnim(num_anim);
    if (9 + len != getIndex()) {
        throw ParserException("data length mismatch");
    }



}
void CAFF::readCAFFCredits() {

    if (int(data[getIndex()]) != 2) {
        throw ParserException("Header should start with ID:2");
    }
    incrementIndex();

    //get the value of the length field 
    int len = readBlockInt(8);

    int end = getIndex() + len;
    setDate();

    int creator_len = readBlockInt(8);

    std::string creator = readBlockAscii(creator_len);
    setCreator(creator);
    if (end != getIndex()) {
        throw ParserException("data length mismatch");
    }

}
void CAFF::readCAFFAnimation() {
    for (int i = 0; i < getNumAnim(); i++) {
        if (int(data[getIndex()]) != 3) {
            throw ParserException("Header should start with ID:3");
        }
        incrementIndex();

        int block_len = readBlockInt(8);

        int duration = readBlockInt(8);

        CIFF image = CIFF();
        readCIFFHeader(&image);
        readCIFFContent(&image);
        images.push_back(std::make_tuple(image, duration));
    }
}

int CAFF::getNumAnim() {
    return num_anim;
}

void CAFF::readCIFFHeader(CIFF* image) {
    int start_index = getIndex();

    std::string magic = readBlockAscii(4);
    if (magic != "CIFF") {
        throw ParserException("Magic block should be CIFF");
    }

    int header_size = readBlockInt(8);
    int content_size = readBlockInt(8);
    int width = readBlockInt(8);
    int height = readBlockInt(8);

    if (content_size == width * height * 3) {
        image->setContentSize(content_size);
        image->setWidth(width);
        image->setHeight(height);
    }
    else {
        throw ParserException("Problem with content size");
    }

    std::string caption;
    while (data[getIndex()] != '\n') {
        if (getIndex() <= start_index + header_size) {
            caption += readBlockAscii(1);
        }
        else {
            throw ParserException("Invalid CIFF header");
        }
    }
    incrementIndex();
    image->setCaption(caption);

    int remain_len = header_size - 36 - (caption.length() + 1);
    if (remain_len < 0) {
        throw ParserException("Invalid CIFF header");
    }

    std::string currentTag;
    for (int i = 0; i < remain_len; i++) {
        if (data[getIndex()] == '\n') {
            throw ParserException("Invalid CIFF header");
        }
        if (data[getIndex()] != '\0')
            currentTag += readBlockAscii(1);
        else {
            image->pushTag(currentTag);
            currentTag.clear();
            incrementIndex();
        }
    }
}

void CAFF::readCIFFContent(CIFF* image) {
    for (unsigned int i = 0; i < image->getContentSize() / 3; i++) {
        Pixel pixel((int)data[getIndex()], (int)data[getIndex() + 1], (int)data[getIndex() + 2]);
        image->pushPixel(pixel);
        incrementIndex(3);
    }
}

std::string CAFF::getCreator() {
    return creator;
}

void CAFF::createThumbnail() {
    auto image_duration = images[0];
    CIFF image = std::get<0>(image_duration);
    std::vector<Pixel> pixels = image.getPixels();

    EasyBMP::Image img(image.getWidth(), image.getHeight(), "thumbnail.bmp");

    int index = 0;
    for (int i = 0; i < image.getHeight(); i++)
    {
        for (int j = 0; j < image.getWidth(); j++)
        {
            Pixel p = pixels[index];
            img.SetPixel(j, i, EasyBMP::RGBColor(p.r, p.g, p.b));
            index++;
        }
    }

    const std::string out = img.Write();
    setThumbnail(out);
}

std::vector<std::tuple<CIFF, unsigned int>> CAFF::getImages() {
    return images;
}

std::string CAFF::getThumbnail() {
    return thumbnail;
}

void CAFF::setThumbnail(std::string thumbnail_) {
    thumbnail = thumbnail_;
}
