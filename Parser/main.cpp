#include "CAFF.h"

int main() {


	std::string input_path = "2.caff";
	CAFF caff(false,input_path);
	caff.parse();
	
}