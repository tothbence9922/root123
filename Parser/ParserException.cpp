#include "ParserException.h"

const char* ParserException::what() const throw()
{
	return message.c_str();
}


