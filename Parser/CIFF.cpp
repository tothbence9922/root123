#include "CIFF.h"


CIFF::CIFF() {
    header_size = 0;
    content_size = 0;
    width = 0;
    height = 0;
}

CIFF::~CIFF() {
    tags.clear();
    pixels.clear();
}

unsigned int CIFF::getHeaderSize() {
    return header_size;
}
void CIFF::setHeaderSize(unsigned int headerSize) {
    header_size = headerSize;
}
unsigned int CIFF::getContentSize() {
    return content_size;
}
void CIFF::setContentSize(unsigned int contentSize) {
    content_size = contentSize;
}
unsigned int CIFF::getWidth() {
    return width;
}
void CIFF::setWidth(unsigned int w) {
    width = w;
}
unsigned int CIFF::getHeight() {
    return height;
}
void CIFF::setHeight(unsigned int h) {
    height = h;
}
std::string CIFF::getCaption() {
    return caption;
}
void CIFF::setCaption(std::string c) {
    caption = c;
}
void CIFF::pushTag(std::string tag) {
    tags.push_back(tag);
}
std::vector<std::string> CIFF::getTags() {
    return tags;
}
void CIFF::pushPixel(Pixel pixel) {
    pixels.push_back(pixel);
}
std::vector<Pixel> CIFF::getPixels() {
    return pixels;
}