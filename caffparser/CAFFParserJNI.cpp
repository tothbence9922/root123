#include "pch.h"
#include <jni.h>
#include "jni_jniparser_CAFFParser.h"
#include "CAFF.h"
#include "ParserException.h"
#include <string>
#include <vector>
#include <sstream>
#include <iterator>

JNIEXPORT jobject JNICALL Java_jni_jniparser_CAFFParser_parse(JNIEnv *env, jobject thisObj, jbyteArray input) {
	int len = env->GetArrayLength(input);
	if (len == 0) {
		printf("input is empty. terminating\n");
		return NULL;
	}
	unsigned char* buffer = new unsigned char[len];
	env->GetByteArrayRegion(input, 0, len, reinterpret_cast<jbyte*>(buffer));
	std::vector<unsigned char> data = std::vector<unsigned char>(buffer, buffer + len);

	jclass caffResponseClass = env->FindClass("jni/jniparser/CAFFResponse");
	if (caffResponseClass == NULL) {
		printf("responseclass is null. terminating\n");
		return NULL;
	}
	jobject newCAFFResponse = env->AllocObject(caffResponseClass);
	if (newCAFFResponse == NULL) {
		printf("newCAFFResponse is null. terminating\n");
		return NULL;
	}

	jmethodID mSetCreator = env->GetMethodID(caffResponseClass, "SetCreator", "(Ljava/lang/String;)V");
	if (mSetCreator == NULL) {
		printf("SetCreator method does not exist. Returning.\n");
		return NULL;
	}
	jmethodID mSetDate = env->GetMethodID(caffResponseClass, "SetDate", "(Ljava/lang/String;)V");
	if (mSetDate == NULL) {
		printf("SetDate method does not exist. Returning.\n");
		return NULL;
	}
	jmethodID mSetThumbnailCaption = env->GetMethodID(caffResponseClass, "SetThumbnailCaption", "(Ljava/lang/String;)V");
	if (mSetThumbnailCaption == NULL) {
		printf("SetThumbnailCaption method does not exist. Returning.\n");
		return NULL;
	}
	jmethodID mSetThumbnailTags = env->GetMethodID(caffResponseClass, "SetThumbnailTags", "(Ljava/lang/String;)V");
	if (mSetThumbnailTags == NULL) {
		printf("SetThumbnailTags method does not exist. Returning.\n");
		return NULL;
	}
	jmethodID mSetThumbnail = env->GetMethodID(caffResponseClass, "SetThumbnail", "([B)V");
	if (mSetThumbnail == NULL) {
		printf("SetThumbnail method does not exist. Returning.\n");
		return NULL;
	}
	jmethodID mSetError = env->GetMethodID(caffResponseClass, "SetError", "(Ljava/lang/String;)V");
	if (mSetError == NULL) {
		printf("SetError method does not exist. Returning.\n");
		return NULL;
	}
	CAFF* caff;
	const char * thumbnail;
	try {
		caff = new CAFF(data);
		caff->parse();
	}
	catch (ParserException e) {
		env->CallObjectMethod(newCAFFResponse, mSetError, env->NewStringUTF(e.what()));
		return newCAFFResponse;
	}
	env->CallObjectMethod(newCAFFResponse, mSetCreator, env->NewStringUTF(caff->getCreator().c_str()));
	env->CallObjectMethod(newCAFFResponse, mSetDate, env->NewStringUTF(caff->getDate().c_str()));
	CIFF image = std::get<0>(caff->getImages()[0]);
	env->CallObjectMethod(newCAFFResponse, mSetThumbnailCaption, env->NewStringUTF(image.getCaption().c_str()));

	const char* const delim = ",";
	std::string outTags;
	for (std::string tag : image.getTags()) {
		outTags.append(tag);
		outTags.append(delim);
	}
	outTags.pop_back();
	env->CallObjectMethod(newCAFFResponse, mSetThumbnailTags, env->NewStringUTF(outTags.c_str()));

	jbyteArray arr = env->NewByteArray(caff->getThumbnail().length());
	env->SetByteArrayRegion(arr, 0, caff->getThumbnail().length(), (jbyte*)caff->getThumbnail().c_str());
	env->CallObjectMethod(newCAFFResponse, mSetThumbnail, arr);
	
	return newCAFFResponse;
}
