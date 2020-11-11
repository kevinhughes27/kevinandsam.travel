with import <nixpkgs> {};

stdenv.mkDerivation {
  name = "kevinandsam.travel";
  buildInputs = [
    nodejs-10_x
    (yarn.override { nodejs = nodejs-10_x; })
  ];
}
