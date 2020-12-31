$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        let userData = getUserGithub(username);
        let userRepos = getUserReposGitHub(username);
        
        userData.then(function(user){
            let { 
                name,
                avatar_url,
                html_url,
                public_repos,
                public_gists,
                followers,
                following,
                company,
                blog,
                location,
                created_at 
            } = user;

            $('#profile').html(`
                <div class="card border-primary mb-3" style="max-width: 100rem;">
                <div class="card-header"><h3>${name}</h3></div>
                <div class="card-body">
                    <div class="row">
                    <div class="col-md-3">
                    <img class="img-thumbnail avatar" src="${avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block" href="${html_url}">View Profile</a>
                    </div>
                    <div class="col-md-9">
                    <span class="badge badge-dark">Public Repos: ${public_repos}</span>
                    <span class="badge badge-primary">Public Gists: ${public_gists}</span>
                    <span class="badge badge-success">Followers: ${followers}</span>
                    <span class="badge badge-info">Following: ${following}</span>
                    <br><br>
                    <ul class="list-group">
                        <li class="list-group-item">Company: ${company}</li>
                        <li class="list-group-item">Website/blog: <a href="${blog}" target="_blank">${blog}</a></li>
                        <li class="list-group-item">Location: ${location}</li>
                        <li class="list-group-item">Member Since: ${created_at}</li>
                    </ul>
                    </div>
                    </div>
                </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                <div id="repos"></div>
            `);
        });

        userRepos.then(function(repos){
            $.each(repos, function(index, repo){
                let {
                    name,
                    description,
                    forks_count,
                    watchers_count,
                    stargazers_count,
                    html_url
                } = repo;

                $('#repos').append(`
                    <div class="card">
                    <div class="row">
                        <div class="col-md-7">
                        <strong>${name}</strong>: ${description}
                        </div>
                        <div class="col-md-3">
                        <span class="badge badge-dark">Forks: ${forks_count}</span>
                        <span class="badge badge-primary">Watchers: ${watchers_count}</span>
                        <span class="badge badge-success">Stars: ${stargazers_count}</span>
                        </div>
                        <div class="col-md-2">
                        <a href="${html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                        </div>
                    </div>
                    </div>
                `);
            })
        })
    });

    // Function request to Github get user
    async function getUserGithub(username){
        let data;

        try {
            data = await $.ajax({
                url:'https://api.github.com/users/'+username,
                data:{
                    client_id:'56c7061aaead7f69eeca',
                    client_secret:'fad1401416789dca7ea2741d03099f7aa15f4940'
                }
            });

            return data;
        } catch (error) {
            console.error(error);
        }
    };

    // Function request to get Github repos
    async function getUserReposGitHub(username){
        let data;

        try {
            data = await $.ajax({
                url:'https://api.github.com/users/'+username+'/repos',
                data:{
                    client_id:'56c7061aaead7f69eeca',
                    client_secret:'fad1401416789dca7ea2741d03099f7aa15f4940',
                    sort: 'created: asc',
                    per_page: 5
                }
            });

            return data;
        } catch (error) {
            console.error(error);
        }
    }

});