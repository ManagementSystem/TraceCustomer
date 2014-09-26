package util.test;

import com.successfactors.util.ReadExcelUtil;

public class ParseExcelTest {
	public static void main(String[] args) {
		ReadExcelUtil util = new ReadExcelUtil();
		String filePath = System.getProperty("user.dir") + "\\resources\\test.xls";
		util.setInputFile(filePath);
		util.read();
	}
}
