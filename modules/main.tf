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
  has_issues  = true
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
