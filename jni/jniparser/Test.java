package jni.jniparser;
import java.io.FileOutputStream;

public class Test {
	public static void main(String[] args) {
		CAFFResponse resp = new CAFFParser().parse("1.caff");
		System.out.println(resp.GetError());
		System.out.println(resp.GetCreator());
		System.out.println(resp.GetDate());
		System.out.println(resp.GetThumbnailCaption());
		System.out.println(resp.GetThumbnailTags());
		System.out.println(resp.GetThumbnail().length);
		try {
			FileOutputStream fos = new FileOutputStream("output.bmp");
			fos.write(resp.GetThumbnail());
			fos.close();
		} catch(Exception e) {
			System.out.println(e);
		}
		
	}
}