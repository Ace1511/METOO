function MM_timelinePlay(tmLnName, myID) { //v1.2
  //Copyright 1998, 1999, 2000, 2001, 2002, 2003, 2004 Macromedia, Inc. All rights reserved.
  var i,j,tmLn,props,keyFrm,sprite,numKeyFr,firstKeyFr,propNum,theObj,firstTime=false;
  if (document.MM_Time == null) MM_initTimelines(); //if *very* 1st time
  tmLn = document.MM_Time[tmLnName];
  if (myID == null) { myID = ++tmLn.ID; firstTime=true;}//if new call, incr ID
  if (myID == tmLn.ID) { //if Im newest
    setTimeout('MM_timelinePlay("'+tmLnName+'",'+myID+')',tmLn.delay);
    fNew = ++tmLn.curFrame;
    for (i=0; i<tmLn.length; i++) {
      sprite = tmLn[i];
      if (sprite.charAt(0) == 's') {
        if (sprite.obj) {
          numKeyFr = sprite.keyFrames.length; firstKeyFr = sprite.keyFrames[0];
          if (fNew >= firstKeyFr && fNew <= sprite.keyFrames[numKeyFr-1]) {//in range
            keyFrm=1;
            for (j=0; j<sprite.values.length; j++) {
              props = sprite.values[j]; 
              if (numKeyFr != props.length) {
                if (props.prop2 == null) sprite.obj[props.prop] = props[fNew-firstKeyFr];
                else        sprite.obj[props.prop2][props.prop] = props[fNew-firstKeyFr];
              } else {
                while (keyFrm<numKeyFr && fNew>=sprite.keyFrames[keyFrm]) keyFrm++;
                if (firstTime || fNew==sprite.keyFrames[keyFrm-1]) {
                  if (props.prop2 == null) sprite.obj[props.prop] = props[keyFrm-1];
                  else        sprite.obj[props.prop2][props.prop] = props[keyFrm-1];
        } } } } }
      } else if (sprite.charAt(0)=='b' && fNew == sprite.frame) eval(sprite.value);
      if (fNew > tmLn.lastFrame) tmLn.ID = 0;
  } }
}

function MM_timelineGoto(tmLnName, fNew, numGotos) { //v2.0
  //Copyright 1998, 1999, 2000, 2001, 2002, 2003, 2004 Macromedia, Inc. All rights reserved.
  var i,j,tmLn,props,keyFrm,sprite,numKeyFr,firstKeyFr,lastKeyFr,propNum,theObj;
  if (document.MM_Time == null) MM_initTimelines(); //if *very* 1st time
  tmLn = document.MM_Time[tmLnName];
  if (numGotos != null)
    if (tmLn.gotoCount == null) tmLn.gotoCount = 1;
    else if (tmLn.gotoCount++ >= numGotos) {tmLn.gotoCount=0; return}
  jmpFwd = (fNew > tmLn.curFrame);
  for (i = 0; i < tmLn.length; i++) {
    sprite = (jmpFwd)? tmLn[i] : tmLn[(tmLn.length-1)-i]; //count bkwds if jumping back
    if (sprite.charAt(0) == "s") {
      numKeyFr = sprite.keyFrames.length;
      firstKeyFr = sprite.keyFrames[0];
      lastKeyFr = sprite.keyFrames[numKeyFr - 1];
      if ((jmpFwd && fNew<firstKeyFr) || (!jmpFwd && lastKeyFr<fNew)) continue; //skip if untouchd
      for (keyFrm=1; keyFrm<numKeyFr && fNew>=sprite.keyFrames[keyFrm]; keyFrm++);
      for (j=0; j<sprite.values.length; j++) {
        props = sprite.values[j];
        if (numKeyFr == props.length) propNum = keyFrm-1 //keyframes only
        else propNum = Math.min(Math.max(0,fNew-firstKeyFr),props.length-1); //or keep in legal range
        if (sprite.obj != null) {
          if (props.prop2 == null) sprite.obj[props.prop] = props[propNum];
          else        sprite.obj[props.prop2][props.prop] = props[propNum];
      } }
    } else if (sprite.charAt(0)=='b' && fNew == sprite.frame) eval(sprite.value);
  }
  tmLn.curFrame = fNew;
  if (tmLn.ID == 0) eval('MM_timelinePlay(tmLnName)');
}

function MM_initTimelines() { //v4.0
    //MM_initTimelines() Copyright 1997 Macromedia, Inc. All rights reserved.
    var ns = navigator.appName == "Netscape";
    var ns4 = (ns && parseInt(navigator.appVersion) == 4);
    var ns5 = (ns && parseInt(navigator.appVersion) > 4);
    var macIE5 = (navigator.platform ? (navigator.platform == "MacPPC") : false) && (navigator.appName == "Microsoft Internet Explorer") && (parseInt(navigator.appVersion) >= 4);
    document.MM_Time = new Array(1);
    document.MM_Time[0] = new Array(3);
    document.MM_Time["Timeline1"] = document.MM_Time[0];
    document.MM_Time[0].MM_Name = "Timeline1";
    document.MM_Time[0].fps = 15;
    document.MM_Time[0][0] = new String("sprite");
    document.MM_Time[0][0].slot = 1;
    if (ns4)
        document.MM_Time[0][0].obj = document["apDiv1"];
    else if (ns5)
        document.MM_Time[0][0].obj = document.getElementById("apDiv1");
    else
        document.MM_Time[0][0].obj = document.all ? document.all["apDiv1"] : null;
    document.MM_Time[0][0].keyFrames = new Array(1, 14, 21, 30, 39, 47, 54, 61, 74, 75, 76, 77, 79, 83, 86, 87, 88, 89, 90, 94, 105, 111, 114, 118, 132, 141, 143, 146, 154, 159, 164, 174, 179, 186, 187, 190, 191, 193, 213);
    document.MM_Time[0][0].values = new Array(2);
    if (ns5 || macIE5)
        document.MM_Time[0][0].values[0] = new Array("80px", "80px", "81px", "81px", "82px", "82px", "82px", "83px", "83px", "83px", "84px", "84px", "85px", "85px", "85px", "85px", "85px", "85px", "85px", "87px", "90px", "94px", "98px", "102px", "107px", "113px", "119px", "126px", "133px", "141px", "150px", "160px", "170px", "180px", "191px", "202px", "213px", "224px", "234px", "245px", "257px", "268px", "279px", "290px", "301px", "312px", "323px", "335px", "348px", "360px", "372px", "384px", "395px", "407px", "417px", "427px", "436px", "446px", "456px", "468px", "481px", "492px", "504px", "516px", "529px", "542px", "556px", "570px", "583px", "595px", "606px", "616px", "625px", "634px", "641px", "649px", "654px", "659px", "668px", "679px", "693px", "708px", "722px", "738px", "750px", "759px", "759px", "759px", "759px", "759px", "759px", "759px", "758px", "757px", "756px", "756px", "755px", "755px", "754px", "753px", "752px", "751px", "750px", "748px", "746px", "741px", "735px", "728px", "721px", "714px", "708px", "699px", "690px", "680px", "672px", "664px", "653px", "635px", "626px", "617px", "608px", "598px", "587px", "576px", "564px", "552px", "539px", "528px", "516px", "506px", "495px", "485px", "472px", "461px", "452px", "444px", "437px", "431px", "426px", "421px", "416px", "407px", "405px", "400px", "394px", "390px", "389px", "389px", "389px", "389px", "389px", "390px", "391px", "392px", "394px", "397px", "401px", "405px", "410px", "416px", "422px", "429px", "437px", "447px", "454px", "462px", "470px", "478px", "487px", "496px", "505px", "513px", "520px", "528px", "538px", "546px", "554px", "562px", "572px", "583px", "596px", "609px", "622px", "634px", "645px", "654px", "668px", "680px", "693px", "704px", "713px", "714px", "722px", "724px", "727px", "729px", "732px", "734px", "737px", "740px", "743px", "746px", "749px", "752px", "756px", "760px", "763px", "766px", "770px", "773px", "777px", "780px", "784px");
    else
        document.MM_Time[0][0].values[0] = new Array(80,80,81,81,82,82,82,83,83,83,84,84,85,85,85,85,85,85,85,87,90,94,98,102,107,113,119,126,133,141,150,160,170,180,191,202,213,224,234,245,257,268,279,290,301,312,323,335,348,360,372,384,395,407,417,427,436,446,456,468,481,492,504,516,529,542,556,570,583,595,606,616,625,634,641,649,654,659,668,679,693,708,722,738,750,759,759,759,759,759,759,759,758,757,756,756,755,755,754,753,752,751,750,748,746,741,735,728,721,714,708,699,690,680,672,664,653,635,626,617,608,598,587,576,564,552,539,528,516,506,495,485,472,461,452,444,437,431,426,421,416,407,405,400,394,390,389,389,389,389,389,390,391,392,394,397,401,405,410,416,422,429,437,447,454,462,470,478,487,496,505,513,520,528,538,546,554,562,572,583,596,609,622,634,645,654,668,680,693,704,713,714,722,724,727,729,732,734,737,740,743,746,749,752,756,760,763,766,770,773,777,780,784);
    document.MM_Time[0][0].values[0].prop = "left";
    if (ns5 || macIE5)
        document.MM_Time[0][0].values[1] = new Array("-113px", "-101px", "-88px", "-76px", "-64px", "-52px", "-39px", "-27px", "-16px", "-5px", "6px", "17px", "26px", "36px", "50px", "62px", "73px", "83px", "93px", "104px", "114px", "123px", "132px", "142px", "151px", "160px", "169px", "177px", "185px", "193px", "200px", "206px", "212px", "217px", "221px", "226px", "230px", "235px", "239px", "244px", "249px", "253px", "258px", "262px", "266px", "270px", "274px", "278px", "283px", "287px", "290px", "294px", "297px", "300px", "302px", "304px", "306px", "307px", "308px", "308px", "309px", "309px", "310px", "310px", "310px", "310px", "310px", "310px", "310px", "310px", "310px", "310px", "310px", "310px", "307px", "304px", "302px", "300px", "299px", "299px", "300px", "300px", "298px", "291px", "282px", "275px", "272px", "269px", "263px", "244px", "235px", "224px", "210px", "191px", "180px", "168px", "156px", "142px", "128px", "113px", "98px", "85px", "72px", "60px", "49px", "36px", "27px", "20px", "16px", "11px", "6px", "-5px", "-14px", "-23px", "-29px", "-36px", "-40px", "-42px", "-42px", "-43px", "-43px", "-44px", "-44px", "-44px", "-44px", "-44px", "-43px", "-42px", "-41px", "-40px", "-38px", "-35px", "-29px", "-22px", "-14px", "-5px", "3px", "11px", "18px", "25px", "31px", "44px", "55px", "65px", "75px", "91px", "100px", "110px", "120px", "131px", "143px", "154px", "164px", "174px", "187px", "198px", "208px", "218px", "228px", "237px", "245px", "253px", "262px", "272px", "279px", "287px", "296px", "305px", "314px", "323px", "331px", "339px", "346px", "352px", "358px", "361px", "362px", "362px", "364px", "367px", "371px", "376px", "380px", "384px", "387px", "389px", "385px", "385px", "385px", "385px", "385px", "374px", "386px", "394px", "402px", "411px", "420px", "430px", "440px", "451px", "462px", "474px", "487px", "500px", "514px", "527px", "541px", "554px", "568px", "581px", "595px", "608px", "622px");
    else
        document.MM_Time[0][0].values[1] = new Array(-113,-101,-88,-76,-64,-52,-39,-27,-16,-5,6,17,26,36,50,62,73,83,93,104,114,123,132,142,151,160,169,177,185,193,200,206,212,217,221,226,230,235,239,244,249,253,258,262,266,270,274,278,283,287,290,294,297,300,302,304,306,307,308,308,309,309,310,310,310,310,310,310,310,310,310,310,310,310,307,304,302,300,299,299,300,300,298,291,282,275,272,269,263,244,235,224,210,191,180,168,156,142,128,113,98,85,72,60,49,36,27,20,16,11,6,-5,-14,-23,-29,-36,-40,-42,-42,-43,-43,-44,-44,-44,-44,-44,-43,-42,-41,-40,-38,-35,-29,-22,-14,-5,3,11,18,25,31,44,55,65,75,91,100,110,120,131,143,154,164,174,187,198,208,218,228,237,245,253,262,272,279,287,296,305,314,323,331,339,346,352,358,361,362,362,364,367,371,376,380,384,387,389,385,385,385,385,385,374,386,394,402,411,420,430,440,451,462,474,487,500,514,527,541,554,568,581,595,608,622);
    document.MM_Time[0][0].values[1].prop = "top";
    if (!ns4) {
        document.MM_Time[0][0].values[0].prop2 = "style";
        document.MM_Time[0][0].values[1].prop2 = "style";
    }
    document.MM_Time[0][1] = new String("sprite");
    document.MM_Time[0][1].slot = 2;
    if (ns4)
        document.MM_Time[0][1].obj = document["apDiv3"] ? document["apDiv3"].document["apDiv2"] : document["apDiv2"];
    else if (ns5)
        document.MM_Time[0][1].obj = document.getElementById("apDiv2");
    else
        document.MM_Time[0][1].obj = document.all ? document.all["apDiv2"] : null;
    document.MM_Time[0][1].keyFrames = new Array(1, 88, 91, 107, 110, 113, 116, 118, 121);
    document.MM_Time[0][1].values = new Array(4);
    if (ns5 || macIE5)
        document.MM_Time[0][1].values[0] = new Array("7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "7px", "8px", "8px", "8px", "8px", "8px", "8px", "8px", "8px", "12px", "16px", "19px", "19px", "18px", "18px", "17px", "16px", "16px", "15px", "14px", "13px", "13px", "12px", "11px", "11px", "10px", "9px", "9px", "8px", "9px", "9px", "9px", "9px", "9px", "9px", "9px", "9px", "8px", "7px", "6px", "4px", "3px");
    else
        document.MM_Time[0][1].values[0] = new Array(7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,12,16,19,19,18,18,17,16,16,15,14,13,13,12,11,11,10,9,9,8,9,9,9,9,9,9,9,9,8,7,6,4,3);
    document.MM_Time[0][1].values[0].prop = "left";
    if (ns5 || macIE5)
        document.MM_Time[0][1].values[1] = new Array("-153px", "-147px", "-142px", "-136px", "-130px", "-125px", "-119px", "-113px", "-108px", "-102px", "-96px", "-91px", "-85px", "-79px", "-74px", "-68px", "-62px", "-56px", "-51px", "-45px", "-39px", "-34px", "-28px", "-22px", "-17px", "-11px", "-5px", "0px", "6px", "12px", "17px", "23px", "29px", "34px", "40px", "46px", "51px", "57px", "63px", "68px", "74px", "80px", "85px", "91px", "96px", "101px", "106px", "112px", "117px", "122px", "127px", "132px", "137px", "142px", "146px", "151px", "156px", "160px", "165px", "169px", "174px", "178px", "183px", "187px", "191px", "196px", "200px", "204px", "208px", "212px", "216px", "220px", "224px", "228px", "231px", "235px", "239px", "243px", "246px", "250px", "253px", "257px", "260px", "264px", "267px", "270px", "274px", "277px", "305px", "290px", "277px", "282px", "288px", "293px", "299px", "304px", "310px", "315px", "321px", "327px", "332px", "336px", "341px", "345px", "349px", "353px", "356px", "361px", "357px", "355px", "354px", "354px", "353px", "352px", "351px", "350px", "348px", "342px", "325px", "301px", "276px");
    else
        document.MM_Time[0][1].values[1] = new Array(-153,-147,-142,-136,-130,-125,-119,-113,-108,-102,-96,-91,-85,-79,-74,-68,-62,-56,-51,-45,-39,-34,-28,-22,-17,-11,-5,0,6,12,17,23,29,34,40,46,51,57,63,68,74,80,85,91,96,101,106,112,117,122,127,132,137,142,146,151,156,160,165,169,174,178,183,187,191,196,200,204,208,212,216,220,224,228,231,235,239,243,246,250,253,257,260,264,267,270,274,277,305,290,277,282,288,293,299,304,310,315,321,327,332,336,341,345,349,353,356,361,357,355,354,354,353,352,351,350,348,342,325,301,276);
    document.MM_Time[0][1].values[1].prop = "top";
    if (!ns4) {
        document.MM_Time[0][1].values[0].prop2 = "style";
        document.MM_Time[0][1].values[1].prop2 = "style";
    }
    document.MM_Time[0][1].values[2] = new Array("inherit","visible","visible","visible","visible","visible","visible","visible","visible");
    document.MM_Time[0][1].values[2].prop = "visibility";
    if (!ns4)
        document.MM_Time[0][1].values[2].prop2 = "style";
    if (ns5 || macIE5)
        document.MM_Time[0][1].values[3] = new Array("210px", "209px", "209px", "209px", "209px", "208px", "208px", "208px", "208px", "208px", "207px", "207px", "207px", "207px", "207px", "206px", "206px", "206px", "206px", "206px", "205px", "205px", "205px", "205px", "205px", "204px", "204px", "204px", "204px", "204px", "203px", "203px", "203px", "203px", "202px", "202px", "202px", "202px", "202px", "201px", "201px", "201px", "201px", "201px", "200px", "200px", "200px", "200px", "200px", "199px", "199px", "199px", "199px", "199px", "198px", "198px", "198px", "198px", "198px", "197px", "197px", "197px", "197px", "196px", "196px", "196px", "196px", "196px", "195px", "195px", "195px", "195px", "195px", "194px", "194px", "194px", "194px", "194px", "193px", "193px", "193px", "193px", "193px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px", "192px");
    else
        document.MM_Time[0][1].values[3] = new Array(210,209,209,209,209,208,208,208,208,208,207,207,207,207,207,206,206,206,206,206,205,205,205,205,205,204,204,204,204,204,203,203,203,203,202,202,202,202,202,201,201,201,201,201,200,200,200,200,200,199,199,199,199,199,198,198,198,198,198,197,197,197,197,196,196,196,196,196,195,195,195,195,195,194,194,194,194,194,193,193,193,193,193,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192,192);
    document.MM_Time[0][1].values[3].prop = "width";
    if (!ns4)
        document.MM_Time[0][1].values[3].prop2 = "style";
    document.MM_Time[0][2] = new String("behavior");
    document.MM_Time[0][2].frame = 214;
    document.MM_Time[0][2].value = "MM_timelineGoto('Timeline1','1')";
    document.MM_Time[0].lastFrame = 214;
    for (i=0; i<document.MM_Time.length; i++) {
        document.MM_Time[i].ID = null;
        document.MM_Time[i].curFrame = 0;
        document.MM_Time[i].delay = 1000/document.MM_Time[i].fps;
    }
}