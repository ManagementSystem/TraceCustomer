package com.successfactors.util;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.apache.log4j.Logger;

public class FileUtil {
	private static Logger logger = Logger.getLogger(FileUtil.class);
	
	public static void saveFile(InputStream is,String filePath){
		File file = new File(filePath);
		OutputStream os = null;
		try{
			os = new FileOutputStream(file);
			byte buffer[]=new byte[512];
			int len = 0;
			while((len = is.read(buffer)) != -1)
			{
			 os.write(buffer,0,len);
			}
			logger.info("user file is saved, the file path is " + filePath);
			os.flush();
		}catch(Exception ex){
			logger.error(ex.getMessage());
		}finally{
			try {
				os.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
}
