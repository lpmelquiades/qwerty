sh-qwerty:
	docker exec -it qwerty sh

logs-qwerty:
	docker-compose logs qwerty

# --no-cache is a good practice to avoid issues with unfit docker images
# Using it in the first build is enough.
build-no-cache:
	docker-compose build --no-cache

up-d:
	docker-compose up 

# Using it in the first build is enough.
init: install build-no-cache up-d


test:
	docker exec -it qwerty sh -c "npm run test"

install:
	docker run -dit --name install node:19-bullseye-slim \
	&& docker cp ${PWD}/package.json install:/usr/src  \
	&& docker cp ${PWD}/package-lock.json install:/usr/src  \
	&& docker exec -it install sh -c "cd /usr/src && npm install" \
	&& docker cp install:/usr/src/node_modules ${PWD}\
	&& docker stop install && docker rm -f install \
	&& ls


prune:
	docker system prune -a -f \
	&& docker volume prune -f


# docker rmi -f $(docker images -aq)
