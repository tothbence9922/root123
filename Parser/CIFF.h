#pragma once

#include <fstream>
#include <iostream>
#include <vector>
#include "Pixel.h"

class CIFF {
private:
    unsigned int header_size, content_size, width, height;
    std::string caption;
    std::vector<std::string> tags;
    std::vector<Pixel> pixels;
public:
    CIFF();

    ~CIFF();

    unsigned int getHeaderSize();

    void setHeaderSize(unsigned int headerSize);

    unsigned int getContentSize();

    void setContentSize(unsigned int contentSize);

    unsigned int getWidth();

    void setWidth(unsigned int w);

    unsigned int getHeight();

    void setHeight(unsigned int h);

    std::string getCaption();

    void setCaption(std::string c);

    void pushTag(std::string tag);

    std::vector<std::string> getTags();

    void pushPixel(Pixel pixel);

    std::vector<Pixel> getPixels();

};