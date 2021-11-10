#include "CAFF.h"

int main(int argc, char* argv[]) {
	CAFF* caff;
	if (argc == 1) {
		caff = new CAFF();
		caff->parse();
	}
	else if (argc == 2) {
		caff = new CAFF(argv[1]);
		caff->parse();
	}
	else if (argc == 3) {
		caff = new CAFF(argv[1], argv[2]);
		caff->parse();
	}
	return 0;
	
}