#!/usr/bin/env bash
#---
# Excerpted from "Engineering Elixir Applications",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/beamops for more book information.
#---

# in scripts/asdf_plugins.sh

# install necessary plugins
plugins=(
  "github-cli"
  "packer"
  "terraform"
  "awscli"
  "elixir"
  "erlang"
  "postgres"
  "jq"
  "age"
  "sops"
)
for plugin in "${plugins[@]}"; do
    asdf plugin-add "$plugin" || true 
    # the "|| true" ignore errors if a certain plugin already exists
done

echo "Installation complete."
echo "Please restart your terminal or source your profile file."
