{
  "targets": [
    {
      "target_name": "advertWindow",
      "sources": [ "/cpp/advertWindow.cc" ],
      "include_dirs": [ "<!(node -e \"require('nan')\")" ]
    }
  ]
}