#include "CAFF.h"

int main() {
	std::string input_path = "1.caff";
	CAFF caff(input_path);
	caff.parse();
	
}