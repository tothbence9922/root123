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
    std::vector<std::tuple<CIFF, unsigned int>> images;
public:
    CAFF(std::string input_path);

    ~CAFF();

    void readCAFFHeader();

    void readCAFFCredits();

    void readCAFFAnimation();

    int read_block_int(int block_Length);

    std::string read_block_ascii(int block_Length);

    void set_num_anim(int num);

    int getNumAnim();

    void incrementIndex(int x);

    int getIndex();

    void set_creator(std::string);

    std::string get_creator();

    void readCIFFHeader(CIFF* image);

    void readCIFFContent(CIFF* image);
    

};
