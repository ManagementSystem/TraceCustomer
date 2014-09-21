<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
<% 
String path = request.getContextPath(); 
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; 
%> 
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">  
<link href="css/bootstrap.css" rel="stylesheet">
<link href="css/signin.css" rel="stylesheet">
<title>Insert title here</title>  
</head>  
<body>  
  	<div class="container">
      <form class="form-signin" role="form" action="./j_spring_security_check" method="post">
        <h2 class="form-signin-heading">Please sign in</h2>
        <input type="text" name="j_username" class="form-control" placeholder="User Name" required autofocus>
        <input type="password" name="j_password" class="form-control" placeholder="Password" required>
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      </form>

    </div> <!-- /container -->
</body>  
</html>
