package util.test;

import java.util.List;

import com.successfactors.bean.Users;
import com.successfactors.util.ReadExcelUtil;

public class ParseExcelTest {
	public static void main(String[] args) {
		//ReadExcelUtil util = new ReadExcelUtil();
		String filePath = System.getProperty("user.dir") + "\\resources\\test.xls";
		//util.setInputFile(filePath);
		List<Users> users = null;
		try {
			users = ReadExcelUtil.readUsers(filePath);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		for (Users users2 : users) {
			System.out.println(users2.getName());
		}
	}
}
