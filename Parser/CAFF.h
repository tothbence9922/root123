#pragma once

#include <fstream>
#include <iostream>
#include <vector>
#include <tuple>
#include "CIFF.h"



class CAFF {
private:
    int index;
    int num_anim;
    std::vector<unsigned char> data;
    std::string creator;
    std::string date;
    std::vector<std::tuple<CIFF, unsigned int>> images;
    std::string input_path_;
    bool fuzzing_;
public:
    CAFF(std::string input_path = "../Parser_test/1.caff", bool fuzzing=false );


    ~CAFF();

    void parse();

    void readCAFFHeader();

    void readCAFFCredits();

    void readCAFFAnimation();

    int readBlockInt(int block_Length);

    std::string readBlockAscii(int block_Length);

    void setNumAnim(int num);

    int getNumAnim();

    void incrementIndex(int x);

    int getIndex();

    void setCreator(const std::string &creator_);

    void setDate();

    std::string getDate();

    std::string getCreator();

    void readCIFFHeader(CIFF* image);

    void readCIFFContent(CIFF* image);
    
    void createThumbnail();
};
