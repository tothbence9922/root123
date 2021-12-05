#include "CAFF.h"
#include "ParserException.h"
#include <memory.h>

int main(int argc, char* argv[]) {
	try {
		if (argc == 1) {
			std::shared_ptr<CAFF> caff = std::make_shared<CAFF>();
			caff->parse();
		}
		else if (argc == 2) {
			std::shared_ptr<CAFF> caff = std::make_shared<CAFF>(argv[1]);
			caff->parse();
			printf("haha");
		}
		else if (argc == 3) {
			std::shared_ptr<CAFF> caff = std::make_shared<CAFF>(argv[1], argv[2]);
			caff->parse();
		}
	}
	catch (ParserException &e) {
		std::cout << e.what() << std::endl;
		return -1;
	}
	return 0;
}