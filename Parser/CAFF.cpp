#include "CAFF.h"
#include "ParserException.h"

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
    void CAFF::set_num_anim(int num_anim_) {
        num_anim = num_anim_;
    }

    void CAFF::incrementIndex(int x = 1) {
        index += x;
    }
    int CAFF::getIndex() {
        return index;
    }
    void CAFF::set_duration(int duration_) {
        duration = duration_;
    }
    void CAFF::set_creator(std::string creator_) {
        creator = creator_;
    }

    int CAFF::read_block_int(int block_Length) {

        int ret = 0;
        if (getIndex() + block_Length > data.size()) {
            throw ParserException("index out of range");
        }
        for (int i = 0; i < block_Length; i++) {
            ret |= ((int)data[getIndex() + i]) << (i * block_Length);
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
            throw ParserException("Header shoul start with ID:1");
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

        //get the number of animations
        int num_anim = read_block_int(8);
        set_num_anim(num_anim);


    }
    void CAFF::readCAFFCredits() {
        if (int(data[getIndex()]) != 2) {
            throw ParserException("Header shoul start with ID:2");
        }
        incrementIndex();
        //get the value of the length field 
        int len = read_block_int(8);
        int Y = read_block_int(2);
        int M = read_block_int(1);
        int D = read_block_int(1);
        int h = read_block_int(1);
        int m = read_block_int(1);
        int creator_len = read_block_int(8);
        
        std::string creator = read_block_ascii(creator_len);
        set_creator(creator);
        
    }
    void CAFF::readCAFFAnimation() {
        int duration = read_block_int(8);
        set_duration(duration);
        // read CIFF here
    }
