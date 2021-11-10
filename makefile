default:
	g++ Parser/*.cpp -o Parser_test/caffparser
fuzzing:
	afl-g++ Parser/*.cpp -o Parser_test/fuzzing_caffparser
clean-all:
	rm Parser_test/caffparser
	rm Parser_test/fuzzing_caffparser