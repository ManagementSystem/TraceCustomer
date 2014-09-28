package com.successfactors.bean;

import com.successfactors.constant.ReturnValueConstants;

public class ReturnValue {
	private Object returnData;
	
	private String returnState;
	
	private String returnMsg;

	public ReturnValue(Object data,String state,String msg){
		this.returnData = data;
		this.returnState = state;
		this.returnMsg = msg;
	}
	
	public ReturnValue(){
		this.returnData = null;
		this.returnState = "";
		this.returnMsg = "";
	}
	
	public Object getReturnData() {
		return returnData;
	}

	public void setReturnData(Object returnData) {
		this.returnData = returnData;
	}

	public String getReturnState() {
		return returnState;
	}

	public void setReturnState(String returnState) {
		this.returnState = returnState;
	}

	public String getReturnMsg() {
		return returnMsg;
	}

	public void setReturnMsg(String returnMsg) {
		this.returnMsg = returnMsg;
	}
	
	public void setSuccess(){
		this.returnState = ReturnValueConstants.RETURN_SUCCESS;
	}
	
	public void setError(){
		this.returnState = ReturnValueConstants.RETURN_ERROR;
	}
}
