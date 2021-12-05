package jni.jniparser;

import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class Test {
	public static void main(String[] args) {
		try {
			byte[] data = Files.readAllBytes(Paths.get("C:\\Users\\Felhasznalo\\Desktop\\Projects\\root123\\caff_backend\\src\\main\\resources\\1.caff"));
			CAFFResponse resp = new CAFFParser().parse(data);
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
		} catch (Exception e) {
			System.out.println(e);
		}
	}
}