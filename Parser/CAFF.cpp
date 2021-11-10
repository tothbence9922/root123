#include "CAFF.h"
#include "ParserException.h"
#include "EasyBMP.hpp"

CAFF::CAFF( std::string input_path, bool fuzzing) : input_path_( input_path ), fuzzing_( fuzzing ) {
    if (fuzzing_) {
        data = std::vector<unsigned char>(std::istreambuf_iterator<char>(std::cin), {});
    }
    else {
        std::ifstream input_data(input_path_, std::ios::binary);
        data = std::vector<unsigned char>(std::istreambuf_iterator<char>(input_data), {});
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

void CAFF::set_num_anim(int num_anim_) {
    num_anim = num_anim_;
}

void CAFF::incrementIndex(int x = 1) {
    index += x;
}
int CAFF::getIndex() {
    return index;
}

void CAFF::set_creator(const std::string &creator_) {
    creator = creator_;
}

void CAFF::set_date() {

    std::string  Y = std::to_string(read_block_int(2));
    std::string  M = std::to_string(read_block_int(1));
    std::string  D = std::to_string(read_block_int(1));
    std::string  h = std::to_string(read_block_int(1));
    std::string  m = std::to_string(read_block_int(1));

    date = (Y + "-" + M + "-" + D + " " + h + ":" + m);

}
std::string CAFF::get_date() {
    return date;
}

int CAFF::read_block_int(int block_Length) {

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
std::string CAFF::read_block_ascii(int block_Length) {
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
    int len = read_block_int(8);
    //Process Data Block
    //Check for Magic string
        
    std::string magic = read_block_ascii(4);
    if (magic != "CAFF") {
        throw ParserException("magic block should be CAFF");
    }

    //get header size
    int header_size = read_block_int(8);
    if (header_size != 20) {
        throw ParserException("header length mismatch");
    }
    //get the number of animations
    int num_anim = read_block_int(8);
    set_num_anim(num_anim);
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
    int len = read_block_int(8);
    
    int end = getIndex() + len;
    set_date();
    
    int creator_len = read_block_int(8);
        
    std::string creator = read_block_ascii(creator_len);
    set_creator(creator);
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

        int block_len = read_block_int(8);
        
        int duration = read_block_int(8);

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

    std::string magic = read_block_ascii(4);
    if (magic != "CIFF") {
        throw ParserException("Magic block should be CIFF");
    }

    int header_size = read_block_int(8);
    int content_size = read_block_int(8);
    int width = read_block_int(8);
    int height = read_block_int(8);

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
            caption += read_block_ascii(1);
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
            currentTag += read_block_ascii(1);
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

std::string CAFF::get_creator() {
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

    img.Write();
}
