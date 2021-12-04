package jni.jniparser;

public class CAFFParser {
	static {
		System.loadLibrary("caffparser64");
	}

	public native CAFFResponse parse(byte[] caff_file);
}
