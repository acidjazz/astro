<?php

$dir = '/Users/k/astro/pub/img/work/';

if ($handle = opendir($dir)) {

  while (false !== ($entry  = readdir($handle))) {


    if ($entry != '.' && $entry != '..' && $entry != '.DS_Store') {
      echo $entry;

      if (!is_dir($dir.$entry.'/1440')) {
        echo "mkdir $dir$entry/1440\n";
        exec("mkdir $dir$entry/1440");
      }
      echo "cp $dir$entry/* $dir$entry/1440/.\n";
      exec("cp $dir$entry/* $dir$entry/1440/.");
      echo "cd $dir$entry/1440\n";
      chdir("$dir$entry/1440");
      echo "mogrify -geometry 1440x *\n";
      exec("mogrify -geometry 1440x *");
    }

  }

  closedir($handle);

} else {
  echo "error with handle\r\n";
}

