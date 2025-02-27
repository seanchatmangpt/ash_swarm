#!/usr/bin/env bash	
#---
# Excerpted from "Engineering Elixir Applications",
# published by The Pragmatic Bookshelf.
# Copyrights apply to this code. It may not be used to create training material,
# courses, books, articles, and the like. Contact us if you are in doubt.
# We make no guarantees that this code is fit for any purpose.
# Visit https://pragprog.com/titles/beamops for more book information.
#---

# in scripts/versions.sh	

set -x	

# read the version information from the ./tool-versions file	
version_output=$(cat ./.tool-versions)	

# extract the Elixir version	
ELIXIR_VERSION=$(echo "$version_output" \	
                | grep 'elixir' \	
                | cut -d' ' -f2 \	
                | cut -d'-' -f1)	

# extract Erlang version	
ERLANG_VERSION=$(echo "$version_output" | grep 'erlang' | cut -d' ' -f2)	

# add the variables to the `GITHUB_ENV` (env used by the action's runner)	
{ 	
  echo "ELIXIR_VERSION=${ELIXIR_VERSION}"; 	
  echo "ERLANG_VERSION=${ERLANG_VERSION}"; 	
} >> "$GITHUB_ENV"
