package jni.jniparser;

public class CAFFResponse {
	
	private String creator;
	private String date;
	private String caption;
	private String tags;
	private byte[] thumbnail;
	private String error;
	
	public String GetCreator() {
		return creator;
	}
	
	public void SetCreator(String creator_) {
		creator = creator_;
	}
	
	public String GetDate() {
		return date;
	}
	
	public void SetDate(String date_) {
		date = date_;
	}
	
	public String GetThumbnailCaption() {
		return caption;
	}
	
	public void SetThumbnailCaption(String caption_) {
		caption = caption_;
	}
	
	public String GetThumbnailTags() {
		return tags;
	}
	
	public void SetThumbnailTags(String tags_) {
		tags = tags_;
	}
	
	public byte[] GetThumbnail() {
		return thumbnail;
	}
	
	public void SetThumbnail(byte[] thumbnail_) {
		thumbnail = thumbnail_;
	}
	
	public String GetError() {
		return error;
	}
	
	public void SetError(String error_) {
		error = error_;
	}
	
}