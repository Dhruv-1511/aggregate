<header class="header-style2">

            <div class="navbar-default">

                <!-- start top search -->
                <div class="top-search bg-secondary">
                    <div class="container-fluid px-lg-1-6 px-xl-2-5 px-xxl-2-9">
                        <form class="search-form" action="https://jobboard.websitelayout.net/search.html" method="GET" accept-charset="utf-8">
                            <div class="input-group">
                                <span class="input-group-addon cursor-pointer">
                                    <button class="search-form_submit fas fa-search text-white" type="submit"></button>
                                </span>
                                <input type="text" class="search-form_input form-control" name="s" autocomplete="off" placeholder="Search...">
                                <span class="input-group-addon close-search mt-1"><i class="fas fa-times"></i></span>
                            </div>
                        </form>
                    </div>
                </div>
                <!-- end top search -->

                <div class="container-fluid px-lg-1-6 px-xl-2-5 px-xxl-2-9">
                    <div class="row align-items-center">
                        <div class="col-12 col-lg-12">
                            <div class="menu_area alt-font">
                                <nav class="navbar navbar-expand-lg navbar-light p-0">

                                    <div class="navbar-header navbar-header-custom">
                                        <!-- start logo -->
                                        <div class="custom_logo1" style="font-family: cursive;">
                                        <a href="index-02.php" class="navbar-brand logodefault"><img id="logo" src="img/logos/logo.png" alt="logo" >Aggregate Agro</a>
                                    </div>
                                        <!-- end logo -->
                                    </div>

                                    <div class="navbar-toggler"></div>

                                    <!-- menu area -->
                                    <ul class="navbar-nav ms-auto" id="nav" style="display: none;">
                                        <li><a href="index-02.php">Home</a>
                                        </li>
                                    
                                        </li>
                                        <li><a href="worker_job.php">Job</a>
                                     
                                        </li>
               
                                        <li><a href="about_us.php">About Us</a>
                                        </li>
                                        <li><a href="contact-us.php">Contact Us</a>
                                        </li>

                                        <li><a href="logout.php">Log out</a>
                                           
                                        </li>
                                    </ul>
                                    <!-- end menu area -->

                                    <!-- start attribute navigation -->
                                    <div class="attr-nav align-items-lg-center ms-lg-auto">
                                        <ul>
                                            <li class="search"><a href="#!"><i class="fa fa-search"></i></a></li>
                                            <li class="d-none d-xl-inline-block"><a href="#"><?php 
                                             echo $userinfo['email'];
                                             ?></a></li>
                                            <li><a href="myprofile.php"> <div class="profile_img">
                                                
                                            <?php
                                            if(isset($userinfo['picture'])){
                                                ?>
                                                <img class="rounded-circle" alt="100x100" src="<?php echo $userinfo['picture']; ?>" data-holder-rendered="true" style="width: 52px;height: 52px;">
                                                <?php
                                            }else{
                                                ?>
                                                <img class="rounded-circle" alt="100x100" src="img/avatar/user.png" data-holder-rendered="true" style="width: 50px;height: 45px;">
                                                <?php
                                            }
                                            ?>
                                        </div></a></li>

                                        </ul>
                                    </div>
                                    <!-- end attribute navigation -->

                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>