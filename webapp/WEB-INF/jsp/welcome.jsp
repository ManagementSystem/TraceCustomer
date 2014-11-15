<%@ page language="java" contentType="text/html; charset=UTF-8"  
    pageEncoding="UTF-8"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">  
<html>  
<head>  
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />

    <!-- Styles -->
    <link rel="stylesheet" type="text/css" href=" css/welcome.css" />

    <!-- Fonts -->

    <script src="https://cdn.optimizely.com/js/1626080451.js"></script>
</head>

<body id="page-top" data-spy="scroll" data-target=".navbar-custom">
    <!-- Start Header -->
    <nav class="navbar navbar-custom navbar-fixed-top" role="navigation">
        <div class="container">
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-main-collapse">
                    <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="#page-top"><img src="" width="100" /></a>
            </div>
            <div class="collapse navbar-collapse navbar-right navbar-main-collapse">
                <ul class="nav navbar-nav">
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                    <li class="page-scroll">
                        <a href="login" id="login-button">Log In</a>
                        
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <!-- End Header -->

    <section class="intro">
        <div class="intro-body">
            <div class="container">
                <div class="row">
                    <div class="col-md-8 col-md-offset-2">
                        <h1 class="brand-heading">驰众4S店</h1>
                        <p class="intro-text">货源、客户管理系统 </p>
                        <ul class="list-inline banner-social-buttons">
                            <li>
                                <a href="login" class="btn btn-default btn-lg"><i class="fa fa-twitter fa-fw"></i> <span class="network-name">登陆</span></a>
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>



    <div class="gray-bg">
        <section id="how" class="container content-section">
            <div class="row text-center">
                <div class="col-lg-12">
                    <h2>How it Works</h2>
                    <div class="col-lg-4 ">
                        <i class="fa fa-rss fa-5x text-warning"></i>
                        <br />
                        <br />
                        <h3>Add an RSS Feed</h3>
                        <p>If it has an RSS feed, you can add it! (Blog, Youtube, Pinterest, etc.)</p>
                    </div>
                    <div class="col-lg-4">
                        <i class="fa fa-clock-o fa-5x text-warning"></i>
                        <br />
                        <br />
                        <h3>Set your Schedule</h3>
                        <p>Choose when you want your tweets to be sent out.</p>
                    </div>
                    <div class="col-lg-4">
                        <i class="fa fa-child fa-5x text-warning"></i>
                        <br />
                        <br />
                        <h3>Gain a Following</h3>
                        <p>Share your feed with others and increase your audience!</p>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Scripts -->
    <script src="js/welcome.js" type="text/javascript"></script>
    <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-20652388-10', 'twibble.io');
    ga('send', 'pageview');

	</script>
	
	<script type="text/javascript">
	/* <![CDATA[ */
	(function(){try{var s,a,i,j,r,c,l=document.getElementsByTagName("a"),t=document.createElement("textarea");for(i=0;l.length-i;i++){try{a=l[i].getAttribute("href");if(a&&a.indexOf("/cdn-cgi/l/email-protection") > -1  && (a.length > 28)){s='';j=27+ 1 + a.indexOf("/cdn-cgi/l/email-protection");if (a.length > j) {r=parseInt(a.substr(j,2),16);for(j+=2;a.length>j&&a.substr(j,1)!='X';j+=2){c=parseInt(a.substr(j,2),16)^r;s+=String.fromCharCode(c);}j+=1;s+=a.substr(j,a.length-j);}t.innerHTML=s.replace(/</g,"&lt;").replace(/>/g,"&gt;");l[i].setAttribute("href","mailto:"+t.value);}}catch(e){}}}catch(e){}})();
	/* ]]> */
	</script>
    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="js/jquery-1.11.1.min.js"></script>
    <script src="js/bootstrap.js"></script>
  </body>
</html>
