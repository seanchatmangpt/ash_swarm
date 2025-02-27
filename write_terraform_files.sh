#!/usr/bin/env bash
#
# write_terraform_files.sh
# A simple script to create Terraform files for an existing GitHub repo.

mkdir -p modules
cd modules

cat << 'EOF' > main.tf
##################################
# main.tf
##################################

terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "5.41.0"
    }
  }
}

# Point the provider to your username or organization. 
# The token must be set in GITHUB_TOKEN environment variable or provided in some other secure way.
provider "github" {
  owner = var.github_owner
}

# This is the existing repository—import it rather than recreate.
# Example usage:
#   terraform import github_repository.ash_swarm youruser/ash_swarm
resource "github_repository" "ash_swarm" {
  name        = var.repo_name
  description = "Managing an existing repository via Terraform"
  visibility  = "public"
  # We do NOT specify auto_init, since the repo already exists.
  # Optional: prevent_destroy to avoid accidental deletions
  lifecycle {
    prevent_destroy = true
  }
}

# Resource for milestones
resource "github_repository_milestone" "milestones" {
  for_each    = var.milestones
  owner       = var.github_owner
  repository  = github_repository.ash_swarm.name
  title       = each.value.title
  description = each.value.description
  due_date    = each.value.due_date
}

# Resource for labels
resource "github_issue_label" "issue_labels" {
  for_each   = var.labels
  repository = github_repository.ash_swarm.name
  name       = each.value.name
  color      = each.value.color
}

# Resource for issues (demo version)
resource "github_issue" "tasks" {
  count      = length(var.issues)
  repository = github_repository.ash_swarm.name

  title = var.issues[count.index].title
  body  = var.issues[count.index].body

  # Link to milestone from var.issues
  milestone_number = github_repository_milestone.milestones[
    var.issues[count.index].milestone
  ].number

  labels = [
    for lab in var.issues[count.index].labels :
    github_issue_label.issue_labels[lab].name
  ]
}
EOF

cat << 'EOF' > variables.tf
##################################
# variables.tf
##################################

variable "github_owner" {
  type        = string
  description = "Your GitHub username or org"
}

variable "repo_name" {
  type        = string
  description = "Name of the existing GitHub repo (e.g. ash_swarm)"
}

variable "milestones" {
  type = map(object({
    title       = string
    due_date    = string
    description = string
  }))
  description = "A map of milestones to create/update."
}

variable "labels" {
  type = map(object({
    name  = string
    color = string
  }))
  description = "A map of labels for your repository."
}

variable "issues" {
  type = list(object({
    title     = string
    body      = string
    labels    = list(string)
    milestone = string
  }))
  description = "A list of issues to create or manage."
}
EOF

cat << 'EOF' > project.auto.tfvars
##################################
# project.auto.tfvars
##################################
# Example usage. Adjust as needed.

github_owner = "YOUR_GITHUB_USERNAME"
repo_name    = "ash_swarm"

milestones = {
  "infrastructure" = {
    title       = "Infrastructure"
    due_date    = "2025-12-31"
    description = "All tasks related to Docker, environment, etc."
  },
  "documentation" = {
    title       = "Documentation"
    due_date    = "2026-01-15"
    description = "Docs for features, architecture, etc."
  }
}

labels = {
  "kind-infrastructure" = {
    name  = "Kind:Infrastructure"
    color = "B60205"
  },
  "kind-documentation" = {
    name  = "Kind:Documentation"
    color = "5319E7"
  }
}

issues = [
  {
    title     = "Add Dockerfile"
    body      = "We need a multi-stage Dockerfile..."
    labels    = ["kind-infrastructure"]
    milestone = "infrastructure"
  },
  {
    title     = "Outline top-level architecture"
    body      = "Produce diagrams or docs summarizing the stack"
    labels    = ["kind-documentation"]
    milestone = "documentation"
  }
]
EOF

echo "Done! Created main.tf, variables.tf, and project.auto.tfvars in $(pwd)."
echo "You may now run:"
echo "    terraform init"
echo "    terraform import github_repository.ash_swarm <USERNAME/ash_swarm>"
echo "    terraform plan"
echo "    terraform apply"
