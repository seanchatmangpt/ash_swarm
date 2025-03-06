# Ash Gen Resource

This Fish shell function simplifies the process of generating Ash resources using the `mix ash.gen.resource` command with common defaults and simplified option handling.

## Overview

The `ash-gen-resource` function generates an Ash resource with:

- UUID primary key (`id` attribute)
- Default CRUD actions (create, read, update, destroy)
- Timestamps
- Extended with postgres support
- Auto-confirmation (--yes)

## Usage

```fish
ash-gen-resource resource_name [options]
```

### Options

- `-a` or `--attribute`: Add an attribute to the resource

  - Format: `name:type[:modifier1][:modifier2]...`
  - Available modifiers: `primary_key`, `public`, `sensitive`, `required`

- `-r` or `--relationship`: Add a relationship to the resource
  - Format: `type:name:destination[:modifier1][:modifier2]...`
  - Available modifiers: `public`
  - For `belongs_to` relationships, additional modifiers: `primary_key`, `sensitive`, `required`

## Examples

### Basic resource with attributes

```fish
ash-gen-resource MyApp.Blog.Post \
  -a title:string:required:public \
  -a body:text:public \
  -a view_count:integer
```

### Resource with relationships

```fish
ash-gen-resource MyApp.Blog.Comment \
  -a content:text:required:public \
  -r belongs_to:post:MyApp.Blog.Post:required \
  -r belongs_to:author:MyApp.Accounts.User
```

### Complex example

```fish
ash-gen-resource Helpdesk.Support.Ticket \
  -a subject:string:required:public \
  -a body:string:public \
  -a status:string:public \
  -a priority:integer:public \
  -r belongs_to:representative:Helpdesk.Support.Representative \
  -r belongs_to:customer:Helpdesk.Accounts.Customer:required
```

## Generated Command

The function will print the generated `mix ash.gen.resource` command before executing it, allowing you to see exactly what will be run.
