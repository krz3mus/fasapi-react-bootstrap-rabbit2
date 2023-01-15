from fastapi import FastAPI, Body, WebSocket

from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

app = FastAPI()
clients = set()
data = {
    "scripts": []
}

Base = declarative_base()


class Scripts(Base):
    __tablename__ = 'scripts'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    server = Column(String)
    status = Column(String)
    start_time = Column(DateTime)
    end_time = Column(DateTime)


engine = create_engine('oracle+cx_oracle://user:password@host:port/service_name')
Base.metadata.create_all(bind=engine)
Session = sessionmaker(bind=engine)
session = Session()


@app.get("/data")
async def get_data():
    scripts = session.query(Scripts).all()
    data["scripts"] = [script.__dict__ for script in scripts]
    return data


@app.post("/data")
async def update_data(payload: dict = Body(...)):
    new_script = Scripts(id=payload['id'], name=payload['name'], server=payload['server'], status=payload['status'],
                         start_time=payload['start_time'], end_time=payload['end_time'])
    session.add(new_script)
    session.commit()
    await broadcast_data()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.add(websocket)
    await websocket.send_json(data)
    while True:
        data = await websocket.receive_json()


async def broadcast_data():
    for client in clients:
        await client.send_json(data)
