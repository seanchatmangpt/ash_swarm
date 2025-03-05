function ash-project-gen -d "Generate an Ash Framework project"
    # Parse arguments
    argparse 'i/igniter=+' -- $argv
    or return 1

    # Get project name from positional argument
    if set -q argv[1]
        set project_name $argv[1]
    else
        set project_name "ash_demo_project"
    end

    # Set default igniter arguments to match the original script
    # Define default packages to install if no igniter arguments provided
    if not set -q _flag_igniter
        set _flag_igniter \
            "ash_phoenix" \
            "ash_json_api" \
            "ash_postgres" \
            "ash_authentication" \
            "ash_authentication_phoenix" \
            "ash_admin" \
            "ash_oban" \
            "ash_state_machine" \
            "ash_paper_trail" \
            "--auth-strategy" "password" \
            "--auth-strategy" "magic_link" \
            "--yes"
    end

    # Install base project
    sh -c "curl -s 'https://ash-hq.org/new/$project_name?install=phoenix' | sh"

    if test $status -eq 0
        # Change to project directory
        cd $project_name

        # Install igniter packages with arguments
        set igniter_cmd "mix igniter.install $_flag_igniter"
        eval $igniter_cmd

        # Setup ash
        if test $status -eq 0
            mix ash.setup
            return $status
        else
            echo "Failed to install igniter packages"
            return 1
        end
    else
        echo "Failed to create project"
        return 1
    end
end
