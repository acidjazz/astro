<?php

$dir = './pub/img/blog/';

if ($handle = opendir($dir)) {

  while (false !== ($entry  = readdir($handle))) {


    if ($entry != '.' && $entry != '..' && $entry != '.DS_Store') {

      if (!is_dir($dir.$entry.'/1440')) {

        echo "mkdir $dir$entry/1440\n";
        exec("mkdir $dir$entry/1440");

        // ONLY do this now if the dir wasnt there
        echo "cp $dir$entry/* $dir$entry/1440/.\n";
        exec("cp $dir$entry/* $dir$entry/1440/.");
        echo "cd $dir$entry/1440\n";
        echo "chdir($dir$entry/1440);";
        chdir("$dir$entry/1440");
        echo "mogrify -geometry 1440x *\n";
        exec("mogrify -geometry 1440x *");
        chdir('../../../../../');

      }
    }

  }

  closedir($handle);

} else {
  echo "error with handle\r\n";
}

