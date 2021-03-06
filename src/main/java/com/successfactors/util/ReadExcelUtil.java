package com.successfactors.util;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.successfactors.bean.Car;
import com.successfactors.bean.Customer;
import com.successfactors.bean.Users;
import com.successfactors.constant.UserAuthConstants;

import jxl.Cell;
import jxl.CellType;
import jxl.Sheet;
import jxl.Workbook;
import jxl.read.biff.BiffException;

public class ReadExcelUtil {
	private String inputFile;

	public void setInputFile(String inputFile) {
		this.inputFile = inputFile;
	}

	public void read() {
		File inputWorkbook = new File(inputFile);
		Workbook w;

		try {
			w = Workbook.getWorkbook(inputWorkbook);
			Sheet sheet = w.getSheet(0);
			for (int i = 0; i < sheet.getRows(); i++) {
				for (int j = 0; j < sheet.getColumns(); j++) {
					Cell cell = sheet.getCell(j, i);
					CellType type = cell.getType();
					if (type == CellType.LABEL)
						System.out.println("I got a label "
								+ cell.getContents());
					if (type == CellType.NUMBER)
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

	public static List<Users> readUsers(String inputFile) throws Exception {
		File inputWorkbook = new File(inputFile);
		Workbook w;

		w = Workbook.getWorkbook(inputWorkbook);
		Sheet sheet = w.getSheet(0);
		List<Users> userList = new ArrayList<Users>();

		for (int i = 1; i < sheet.getRows(); i++) {
			Users user = new Users();
			user.setPassword("123456");
			for (int j = 0; j < 3; j++) {
				Cell cell = sheet.getCell(j, i);
				CellType type = cell.getType();
				if (j == 0) {
					user.setUsername(cell.getContents());
				} else if (j == 1) {
					user.setName(cell.getContents());
				} else if (j == 2) {
					if (type == CellType.NUMBER) {
						int role = Integer.parseInt(cell.getContents());
						if (role == 1) {
							user.setPermission(UserAuthConstants.ROLE_ADMIN);
						} else if (role == 2) {
							user.setPermission(UserAuthConstants.ROLE_CUSTOMER);
						} else if (role == 3) {
							user.setPermission(UserAuthConstants.ROLE_SUPPLY);
						} else {
							user.setPermission(UserAuthConstants.ROLE_USER);
						}
					} else {
						throw new Exception("excel is error");
					}
				}
				// System.out.println(cell.getContents());
			}
			userList.add(user);
		}
		return userList;
	}

	public static List<Car> readChannelCars(String inputFile, String operator)
			throws Exception {
		File inputWorkbook = new File(inputFile);
		Workbook w;

		w = Workbook.getWorkbook(inputWorkbook);
		Sheet sheet = w.getSheet(0);
		List<Car> list = new ArrayList<Car>();

		for (int i = 1; i < sheet.getRows(); i++) {
			Cell checkCell = sheet.getCell(0, i);
			if (checkCell == null || "".equals(checkCell.getContents().trim())) {
				break;
			}
			Car car = new Car();
			car.setImportTime(new Date());
			car.setDelFlag(0);
			car.setChannelFlag(1);
			car.setOperator(operator);
			int field = 0;
			try {
				for (int j = 0; j < 12; j++) {
					Cell cell = sheet.getCell(j, i);
					field = j;
					// CellType type = cell.getType();
					switch (j) {
					case 0:
						car.setRegion(cell.getContents());
						break;
					case 1:
						car.setCity(cell.getContents());
						break;
					case 2:
						car.setShopName(cell.getContents());
						break;
					case 3:
						car.setCustomerManager(cell.getContents());
						break;
					case 4:
						car.setCustomerManagerTel(cell.getContents());
						break;
					case 5:
						car.setWechat(cell.getContents());
						break;
					case 6:
						car.setSaleManager(cell.getContents());
						break;
					case 7:
						car.setSaleManagerTel(cell.getContents());
						break;
					case 8:
						car.setType(cell.getContents());
						break;
					case 9:
						car.setPrincipal(cell.getContents());
						break;
					case 10:
						car.setCarTypeRecord(cell.getContents());
						break;
					case 11:
						if("".trim().equals(cell.getContents())){
							car.setIsTop(0);
						}else{
							car.setIsTop(Integer.valueOf(cell.getContents()));
						}
						break;
					}
				}
				list.add(car);
			} catch (Exception ex) {
				throw new Exception(ex.getMessage() + ", cause in " + (i+1) + " line,and " + field + "field");
			}
		}
		return list;
	}

	public static List<Car> readCars(String inputFile, String operator)
			throws BiffException, IOException, ParseException {
		File inputWorkbook = new File(inputFile);
		Workbook w;

		w = Workbook.getWorkbook(inputWorkbook);
		Sheet sheet = w.getSheet(0);
		List<Car> list = new ArrayList<Car>();
		for (int i = 1; i < sheet.getRows(); i++) {
			Cell checkCell = sheet.getCell(0, i);
			if (checkCell == null || "".equals(checkCell.getContents().trim())) {
				break;
			}
			Car car = new Car();
			car.setImportTime(new Date());
			car.setDelFlag(0);
			car.setChannelFlag(0);
			car.setOperator(operator);
			for (int j = 0; j < 18; ++j) {
				Cell cell = sheet.getCell(j, i);
				// CellType type = cell.getType();
				switch (j) {
				case 0:
					car.setRegion(cell.getContents());
					break;
				case 1:
					car.setCity(cell.getContents());
					break;
				case 2:
					car.setShopName(cell.getContents());
					break;
				case 3:
					car.setCustomerManager(cell.getContents());
					break;
				case 4:
					car.setCustomerManagerTel(cell.getContents());
					break;
				case 5:
					car.setWechat(cell.getContents());
					break;
				case 6:
					car.setSaleManager(cell.getContents());
					break;
				case 7:
					car.setSaleManagerTel(cell.getContents());
					break;
				case 8:
					car.setType(cell.getContents());
					break;
				case 9:
					car.setPrincipal(cell.getContents());
					break;
				case 10:
					car.setCarTypeRecord(cell.getContents());
					break;
				case 11:
					car.setConfiguration(cell.getContents());
					break;
				case 12:
					car.setCarColor(cell.getContents());
					break;
				case 13:
					car.setCarDecoration(cell.getContents());
					break;
				case 14:
					SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/YYYY");
					Date date = sdf.parse(cell.getContents());
					car.setProductDate(date);
					break;
				case 15:
					car.setSaleRegion(cell.getContents());
					break;
				case 16:
					car.setPrice(Double.parseDouble(cell.getContents()));
					break;
				case 17:
					if("".trim().equals(cell.getContents())){
						car.setIsTop(0);
					}else{
						car.setIsTop(Integer.valueOf(cell.getContents()));
					}					
					break;
				}

			}
			list.add(car);
		}
		return list;
	}

	public static List<Customer> readCustomer(String inputFile, String userName)
			throws BiffException, IOException {
		File inputWorkbook = new File(inputFile);
		Workbook w;

		w = Workbook.getWorkbook(inputWorkbook);
		Sheet sheet = w.getSheet(0);
		List<Customer> list = new ArrayList<Customer>();
		for (int i = 1; i < sheet.getRows(); i++) {
			Customer customer = new Customer();
			customer.setImportTime(new Date());
			customer.setDelFlag(0);
			customer.setImportName(userName);
			for (int j = 0; j < 12; ++j) {
				Cell cell = sheet.getCell(j, i);
				switch (j) {
				case 0:
					customer.setCustomerType(cell.getContents());
					break;
				case 1:
					customer.setName(cell.getContents());
					break;
				case 2:
					customer.setSex(cell.getContents());
					break;
				case 3:
					customer.setPhone(cell.getContents());
					break;
				case 4:
					customer.setRegion(cell.getContents());
					break;
				case 5:
					customer.setCity(cell.getContents());
					break;
				case 6:
					customer.setCompany(cell.getContents());
					break;
				case 7:
					customer.setCarTypeRecord(cell.getContents());
					break;
				case 8:
					customer.setLevel(cell.getContents());
					break;
				case 9:
					if (cell.getType() == CellType.LABEL)
						if ("私客".trim().equals(cell.getContents())
								|| "私".trim().equals(cell.getContents()))
							customer.setIspublic("0");
						else
							customer.setIspublic("1");
					else
						customer.setIspublic(cell.getContents());
					break;
				case 10:
					if (cell.getType() == CellType.LABEL
							|| cell.getType() == CellType.EMPTY
							|| "".trim().equals(cell.getContents()))
						customer.setDealCount(Integer.valueOf(0));
					else
						customer.setDealCount(Integer.valueOf(cell
								.getContents()));
					break;
				case 11:
					if (cell.getType() == CellType.LABEL)
						if ("否".equals(cell.getContents()))
							customer.setIsTop(0);
						else
							customer.setIsTop(1);
					else
						customer.setIsTop(Integer.valueOf(cell.getContents()));
					break;
				}

			}
			list.add(customer);
		}
		return list;
	}
}
