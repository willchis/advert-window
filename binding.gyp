{
  "targets": [
    {
      "target_name": "matcherWindow",
      "sources": [ "/cpp/matcherWindow.cc" ],
      "include_dirs": [ "<!(node -e \"require('nan')\")" ]
    }
  ]
}