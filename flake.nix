{
  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = (
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        bun = bin: path: pkgs.writeShellScriptBin bin ''exec bun ${path} "$@"'';
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            self.formatter.${system}
            pkgs.bun
            pkgs.nodejs # for development

            # Tools that work over Bun.
            (bun "prettier" "node_modules/.bin/prettier")
            (bun "vite" "node_modules/.bin/vite")
          ];

          shellHook = ''
            export PATH=$(git rev-parse --show-toplevel)/node_modules/.bin:$PATH
            bun i
          '';
        };

        formatter = pkgs.nixfmt-rfc-style;
      }
    )
  );
}
