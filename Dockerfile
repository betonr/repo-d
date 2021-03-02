FROM python:3.7

LABEL autor="Beto Noronha"

RUN mkdir /repoD

WORKDIR /repoD

COPY requirements.txt requirements.txt 

COPY ./api api

RUN pip install -r requirements.txt

COPY ./front-end/dist/front-end front-end

EXPOSE 80

CMD ["uvicorn", "api:app", "--host", "0.0.0.0", "--port", "80"]