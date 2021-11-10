#include "CAFF.h"

int main(int argc, char* argv[]) {
	CAFF* caff;
	if (argc == 1) {
		std::cout << "1 arg" << std::endl;
		caff = new CAFF();
		caff->parse();
	}
	else if (argc == 2) {
		std::cout << "2 arg" << std::endl;
		caff = new CAFF(argv[1]);
		caff->parse();
	}
	else if (argc == 3) {
		std::cout << "3 arg" << std::endl;
		caff = new CAFF(argv[1], argv[2]);
		caff->parse();
	}
	return 0;
	
}