function ash-gen-resource
    argparse --name=ash-gen-resource 'a/attribute=+' 'r/relationship=+' -- $argv
    or return

    if test (count $argv) -ne 1
        echo "Error: resource name is required"
        echo "Usage: ash-gen-resource resource_name [options]"
        return 1
    end

    set resource_name (string trim $argv[1])

    set command "mix ash.gen.resource $resource_name --uuid-primary-key id --default-actions update,read,update,destroy"

    # Add attributes
    if set -q _flag_attribute
        for attr in $_flag_attribute
            set command "$command --attribute $attr "
        end
    end

    # Add relationships
    if set -q _flag_relationship
        for rel in $_flag_relationship
            set command "$command --relationship $rel "
        end
    end

    # Add timestamps and extensions
    set command "$command --timestamps --extend postgres --yes"

    echo -e $command
    eval $command
end
