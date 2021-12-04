package jni.jniparser;

public class CAFFParser {
	static {
			System.loadLibrary("caffparser");
	}
	
	public native CAFFResponse parse(byte[] caff_file);
	
}
