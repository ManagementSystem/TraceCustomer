package util.test;

import java.io.IOException;

import jxl.write.WriteException;

import com.successfactors.util.WriteExcelUtil;

public class WriteExcelTest {
	public static void main(String[] args) {
		WriteExcelUtil util = new WriteExcelUtil();
		String filePath = System.getProperty("user.dir") + "\\resources\\write_test.xls";
		util.setOutputFile(filePath);
		try {
			util.write();
		} catch (WriteException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
}
