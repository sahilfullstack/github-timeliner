import * as React from 'react';
import { RepoCard } from './repo_card';
export function Timeline({ repos }) {
  return (
        <ul className="timeline">
            {repos.map((repo, index) => {
                    let child_props = {
                        name: repo.name,
                        created_at: repo.created_at,
                        updated_at: repo.updated_at,
                        description: repo.description
                    };

                    if(index%2 == 0) {
                        child_props.className = "direction-r";
                    } else {
                        child_props.className = "direction-l";
                    }
                    
                    return (<RepoCard props={child_props} key={index} />);
            })
            }
        </ul>
    );
}
