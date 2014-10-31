package com.successfactors.util;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.successfactors.bean.Users;
import com.successfactors.constant.UserAuthConstants;

import jxl.Cell;
import jxl.CellType;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

public class ReadExcelUtil {
	private String inputFile;
	
	public void setInputFile(String inputFile){
		this.inputFile = inputFile;
	}
	
	public void read(){
		File inputWorkbook = new File(inputFile);
		Workbook w;
		
		
		try {
			w = Workbook.getWorkbook(inputWorkbook);
			Sheet sheet = w.getSheet(0);
			for(int i = 0;i < sheet.getRows();i++){
				for(int j = 0;j < sheet.getColumns();j++){
					Cell cell = sheet.getCell(j,i);
					CellType type = cell.getType();
					if(type == CellType.LABEL)
						 System.out.println("I got a label "
					                + cell.getContents());
					if(type == CellType.NUMBER)
						 System.out.println("I got a number "
					                + cell.getContents());
				}
			}
		} catch (BiffException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public List<Users> readUsers() throws Exception{
		File inputWorkbook = new File(inputFile);
		Workbook w;
		
		w = Workbook.getWorkbook(inputWorkbook);
		Sheet sheet = w.getSheet(0);
		List<Users> userList = new ArrayList<Users>();
		
		for(int i = 1; i < sheet.getRows();i++){
			Users user = new Users();
			user.setPassword("123456");
			for(int j = 0;j < 3;j++){
				Cell cell = sheet.getCell(j,i);
				CellType type = cell.getType();
				if(j == 0){
					user.setUsername(cell.getContents());
				}else if(j == 1){
					user.setName(cell.getContents());
				}else if(j == 2){
					if(type == CellType.NUMBER){
						int role = Integer.parseInt(cell.getContents());
						if( role == 0){
							user.setPermission(UserAuthConstants.ROLE_ADMIN);
						}else if(role == 1){
							user.setPermission(UserAuthConstants.ROLE_CUSTOMER);
						}else if(role == 2){
							user.setPermission(UserAuthConstants.ROLE_SUPPLY);
						}
					}else{
						throw new Exception("excel is error");
					}
				}
				System.out.println(cell.getContents());
			}
			userList.add(user);
		}
		return userList;
	}
}
