#include "CAFF.h"


    CAFF::CAFF(std::string input_path) {

        std::ifstream input_data(input_path, std::ios::binary);
        data = std::vector<unsigned char>(std::istreambuf_iterator<char>(input_data), {});
        index = 0;
        num_anim = 0;
        duration = 0;

    }
    CAFF::~CAFF() {
        data.clear();
    }
    void CAFF::set_num_anim(int num) {
        num_anim = num;
    }

    void CAFF::incrementIndex(int x = 1) {
        index += x;
    }
    int CAFF::getIndex() {
        return index;
    }
    void CAFF::set_duration(int num) {
        duration = num;
    }

    int CAFF::read_block_int(int block_Length) {

        int ret = 0;
        for (int i = 0; i < block_Length; i++) {
            ret |= ((int)data[getIndex() + i]) << (i * block_Length);
        }
        incrementIndex(block_Length);
        return ret;

    }
    std::string CAFF::read_block_ascii(int block_Length) {
        std::string ret;
        for (int i = 0; i < block_Length; i++) {
            ret += data[getIndex() + i];
        }

        incrementIndex(block_Length);
        return ret;
    }
    void CAFF::readCAFFHeader() {

        //Check if ID is correct
        if (int(data[getIndex()]) != 1) {
            std::cout << "HIBA";
        }
        incrementIndex();
        //get the value of the length field 
        int len = read_block_int(8);
        //Process Data Block
        //Check for Magic string
        std::cout << "header len" << len << std::endl;
        std::string magic = read_block_ascii(4);
        if (magic != "CAFF") {
            std::cout << "magic block should be CAFF";
        }

        //get header size
        int header_size = read_block_int(8);
        std::cout << header_size << std::endl;

        //get the number of animations
        int num_anim = read_block_int(8);
        set_num_anim(num_anim);
        std::cout << num_anim << std::endl;


    }
    void CAFF::readCAFFCredits() {
        if (int(data[getIndex()]) != 2) {
            std::cout << "HIBA";
        }
        incrementIndex();
        //get the value of the length field 
        int len = read_block_int(8);
        std::cout << "header" << len << std::endl;
        int Y = read_block_int(2);
        int M = read_block_int(1);
        int D = read_block_int(1);
        int h = read_block_int(1);
        int m = read_block_int(1);
        int creator_len = read_block_int(8);
        std::cout << creator_len << std::endl;
        std::string creator = read_block_ascii(creator_len);
        std::cout << creator << std::endl;
    }
    void CAFF::readCAFFAnimation() {
        int duration = read_block_int(8);
        set_duration(duration);
        // read CIFF here
    }
