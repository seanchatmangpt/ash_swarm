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
