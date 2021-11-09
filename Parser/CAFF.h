#pragma once

#include <fstream>
#include <iostream>
#include <vector>


class CAFF {
private:
    int index;
    int num_anim;
    int duration;
    std::vector<unsigned char> data;
public:
    CAFF(std::string input_path);
    ~CAFF();
    void readCAFFHeader();
    void readCAFFCredits();
    void readCAFFAnimation();
    int read_block_int(int block_Length);
    std::string read_block_ascii(int block_Length);

    void set_num_anim(int num);

    void incrementIndex(int x);

    int getIndex();

    void set_duration(int num);

    
    
    

};
