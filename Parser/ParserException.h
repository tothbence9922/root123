#pragma once
#include <exception>
#include <string>

class ParserException : public std::exception {
	std::string message;
public:
	explicit ParserException(const std::string &message) : message(message), std::exception() {}

	const char* what() const throw();
};