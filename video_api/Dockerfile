FROM python:3.11-slim

# Installer ffmpeg
RUN apt-get update && apt-get install -y \
    ffmpeg \
    wget \
    gnupg \
    lsb-release \
    ca-certificates

RUN apt-get install -y git make cmake gcc g++ libmad0-dev \
  libid3tag0-dev libsndfile1-dev libgd-dev libboost-filesystem-dev \
  libboost-program-options-dev \
  libboost-regex-dev

RUN git clone https://github.com/bbc/audiowaveform.git /opt/audiowaveform

WORKDIR /opt/audiowaveform

RUN wget https://github.com/google/googletest/archive/release-1.12.1.tar.gz && \
 tar xzf release-1.12.1.tar.gz && \
 ln -s googletest-release-1.12.1 googletest

RUN cmake . && make && make install

# Nettoyage pour alléger l'image
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]